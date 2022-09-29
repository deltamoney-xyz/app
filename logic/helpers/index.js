export const scrollToTop = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

export const scrollTo = (selector) => {
  if (typeof window !== "undefined") {
    const block = document.querySelector(selector);
    if (block) {
      const offset = block.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  }
};

export const numberFormat = (
  number,
  decimals = 3,
  dec_point = ".",
  thousands_sep = ",",
  withoutZeros = false
) => {
  var i, j, kw, kd, km;

  // input sanitation & defaults
  if (isNaN((decimals = Math.abs(decimals)))) {
    decimals = 2;
  }
  if (dec_point === undefined) {
    dec_point = ",";
  }
  if (thousands_sep === undefined) {
    thousands_sep = ".";
  }

  i = parseInt((number = (+number || 0).toFixed(decimals))) + "";

  if ((j = i.length) > 3) {
    j = j % 3;
  } else {
    j = 0;
  }

  km = j ? i.substr(0, j) + thousands_sep : "";
  kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
  kd =
    decimals && number - i > 0
      ? dec_point +
        Math.abs(number - i)
          .toFixed(decimals)
          .replace(/-/, 0)
          .slice(2)
      : "";

  if (kd) {
    let kz = 0;
    for (const value of kd) {
      if (value !== ".") {
        if (parseInt(value) > 0) {
          kz++;
        }
      }
    }
    if (kz === 0) {
      kd = "";
    }
  }
  if (kd) {
    let tmp1 = parseFloat("0" + kd).toString();
    let tmp2 = tmp1.split(".");
    kd = "." + tmp2[1];
  } else if (!withoutZeros) {
    kd = ".00";
  }

  return km + kw + kd;
};

export const walletSubstr = (walletAddress) => {
  const address = walletAddress.toString();
  return address
    ? address.substring(0, 6) + "..." + address.substring(address.length - 4)
    : address;
};
