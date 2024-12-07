import bauble1_1 from "../assets/ornaments/bauble1-1.svg";
import bauble1_2 from "../assets/ornaments/bauble1-2.svg";
import bauble1_3 from "../assets/ornaments/bauble1-3.svg";
import bauble2_1 from "../assets/ornaments/bauble2-1.svg";
import bauble2_2 from "../assets/ornaments/bauble2-2.svg";
import bauble2_3 from "../assets/ornaments/bauble2-3.svg";
import bauble3_1 from "../assets/ornaments/bauble3-1.svg";
import bauble3_2 from "../assets/ornaments/bauble3-2.svg";
import bauble3_3 from "../assets/ornaments/bauble3-3.svg";
import bell1 from "../assets/ornaments/bell1.svg";
import bell2 from "../assets/ornaments/bell2.svg";
import bell3 from "../assets/ornaments/bell3.svg";
import candy1 from "../assets/ornaments/candy1.svg";
import candy2 from "../assets/ornaments/candy2.svg";
import candy3 from "../assets/ornaments/candy3.svg";
import candyCane1 from "../assets/ornaments/candyCane1.svg";
import candyCane2 from "../assets/ornaments/candyCane2.svg";
import candyCane3 from "../assets/ornaments/candyCane3.svg";
import snowflake1 from "../assets/ornaments/snowflake1.svg";
import snowflake2 from "../assets/ornaments/snowflake2.svg";
import snowflake3 from "../assets/ornaments/snowflake3.svg";
import sock1 from "../assets/ornaments/sock1.svg";
import sock2 from "../assets/ornaments/sock2.svg";
import sock3 from "../assets/ornaments/sock3.svg";

interface OrnamentMap {
    [key: number]: Array<string>
}

const ornaments: OrnamentMap = {
    0: [ bauble1_1, bauble1_2, bauble1_3 ],
    1: [ bauble2_1, bauble2_2, bauble2_3 ],
    2: [ bauble3_1, bauble3_2, bauble3_3 ],
    3: [ bell1, bell2, bell3 ],
    4: [ candy1, candy2, candy3 ],
    5: [ candyCane1, candyCane2, candyCane3 ],
    6: [ snowflake1, snowflake2, snowflake3 ],
    7: [ sock1, sock2, sock3 ]
}

export const collectionSize = 3;

export const ornament = (index: number) => {
    if (index < 0 || index > 24) {
        throw new Error("Wrong argument value");
    }
    
    const collectionIdx = Math.floor(index / collectionSize);
    const ornamentIdx = index % collectionSize;

    return ornaments[collectionIdx][ornamentIdx];
}