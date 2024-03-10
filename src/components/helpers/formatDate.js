//tarihi alır ve ay / gün formatında döndürür.

const formatDate = (dateStr) => {
  //nerin formatında ki tarihi / göre parçalara ayırdık
  const date = dateStr.split(".");

  // formatlayıp döndür
  return date[0] + "/" + date[1];
};

export default formatDate;
