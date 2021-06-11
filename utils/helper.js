const extractQueries = (path) => {
  let temp = path.split('&');
  let result = {};
  const regex = /(?==)\W/g;
  for (let i = 0; i < temp.length; i++) {
    let currIndex = temp[i].search(regex);
    let currKey = temp[i].substring(0, currIndex);
    let currVal = temp[i].substring(currIndex + 1);
    result[currKey] = currVal;
  }

  return result;
};

export { extractQueries };
