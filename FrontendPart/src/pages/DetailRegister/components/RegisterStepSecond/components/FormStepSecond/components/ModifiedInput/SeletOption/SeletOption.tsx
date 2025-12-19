import styles from "./styles.module.scss";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
import { useEffect, useState } from "react";
import { IUkraineLocation } from "../../../../../../../../../interfaces/UkraineLocations";
import { useAppSelector } from "../../../../../../../../../hooks/AppRedux";
import { UkraineLocationsFilter } from "../../../../../../../../../servers/UkraineLocationsFilter";

interface IProps {
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export function SeletOption(props: IProps) {
    const { location, setLocation } = props;

    const [debouncedLocation, setDebouncedLocation] = useState("");

    const UkraineLocations = useAppSelector(UkraineLocationsFilter(location)) ;

    function handleSelectLocation(category: string, name: string, region: string, community: string): void {
        setLocation(`${category} ${name} ${region} ${community}`);
    }

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedLocation(location), 300);
        return () => clearTimeout(handler);
    }, [location]);

    return (
        <>
            {
                debouncedLocation.length >= 2 && UkraineLocations.length > 0 && <ul className={styles.list}>
                    <SimpleBar className={styles.containerItem}>
                        {UkraineLocations.map((item, _) => (
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
