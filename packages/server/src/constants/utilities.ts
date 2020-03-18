/*
    Certain values are stored in Postgres as a single string
    but need to be separated into an array for use in the client.
    They are deliniated by this marker which is stored in a 
    constant value to elinimate errors or inconsistencies.
*/
export const STRING_DELINIATOR = "///";
