import styles from "./styles.module.scss";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import { useEffect, useState } from "react";
import { IUkraineLocation } from "../../../../../../../../../interfaces/UkraineLocations";

interface IProps {
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    UkraineLocations: IUkraineLocation[];
}

export function SeletOption(props: IProps) {
    const { location, setLocation, UkraineLocations } = props;

    const [debouncedLocation, setDebouncedLocation] = useState("");

    function handleSelectLocation(category: string, name: string, region: string, community: string): void {
        setLocation(`${category} ${name} ${region} ${community}`);
    }

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedLocation(location), 200);
        return () => clearTimeout(handler);
    }, [location]);

    const locations = UkraineLocations.filter((item, _) => {
        const valueInput = debouncedLocation.toLocaleLowerCase();
        const itemValueGategory = item.object_category.toLocaleLowerCase();
        const itemValueCommunity = item.community.toLocaleLowerCase();
        const itemValueName = item.object_name.toLocaleLowerCase();
        const itemValueRegion = item.region.toLocaleLowerCase();

        if (itemValueName.includes(valueInput) ||
            itemValueGategory.includes(valueInput) ||
            itemValueCommunity.includes(valueInput) ||
            itemValueRegion.includes(valueInput)
        ) {
            return item;
        }
    });

    return (
        <>
            {
                debouncedLocation.length >= 2 && locations.length > 0 && <ul className={styles.list}>
                    <SimpleBar className={styles.containerItem}>
                        {locations.map((item, _) => (
                            <li key={item.object_code} onClick={(event) => handleSelectLocation(item.object_category, item.object_name, item.region, item.community)}>
                                <h3>{item.object_category}</h3>
                                <h4>{item.object_name}</h4>
                                <h5>{item.region}</h5>
                                <h6>{item.community}</h6>
                            </li>
                        ))}
                    </SimpleBar>
                </ul>
            }
        </>
    );
}
