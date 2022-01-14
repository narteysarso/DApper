
export const convertWeiToEth = (wei) => {
    return wei * 0.000000000000000001;
}

export const convertUnixTimeStampToDate = (unixTimestamp) => {
    const timestamp = parseInt(unixTimestamp * 1000);

    return new Date(timestamp);
}