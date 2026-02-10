<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use JsonMachine\Items;

class ImportUkraineLocations extends Command
{
    protected $signature = 'import:ukraine_locations {file}';
    protected $description = 'Import large JSON of Ukraine locations safely, all rows';

    public function handle()
    {
        $file = $this->argument('file');

        $items = Items::fromFile($file);

        $batchSize = 500; 
        $batch = [];
        $total = 0;

        foreach ($items as $item) {
            $batch[] = [
                'level_1' => $this->toBigInt($item->level_1),
                'level_2' => $this->toBigInt($item->level_2),
                'level_3' => $this->toBigInt($item->level_3),
                'object_code' => $this->toBigInt($item->object_code),
                'level_4' => $this->toString($item->level_4),
                'object_category' => $this->toString($item->object_category),
                'object_name' => $this->toString($item->object_name),
                'region' => $this->toString($item->region),
                'community' => $this->toString($item->community),
                'created_at' => now(),
                'updated_at' => now(),
            ];

            if (count($batch) >= $batchSize) {
                $this->insertBatch($batch, $total);
                $batch = [];
            }
        }

       
        if (!empty($batch)) {
            $this->insertBatch($batch, $total);
        }

        $this->info("Import finished! Total rows inserted: $total");
    }

    private function insertBatch(array $batch, &$total)
    {
        try {
            DB::table('ukraine_locations')->insert($batch);
            $total += count($batch);
            $this->info("Inserted $total rows...");
        } catch (\Exception $e) {
         
            foreach ($batch as $row) {
                \Log::error('Failed insert: '.$e->getMessage(), $row);
            }
        }
    }

    private function toBigInt($value)
    {
        if (is_numeric($value)) return (int)$value;
        $value = trim($value);
        return ctype_digit($value) ? (int)$value : null;
    }

    private function toString($value, $max = 255)
    {
        return isset($value) ? mb_substr($value, 0, $max) : null;
    }
}