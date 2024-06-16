

export const getPdfByUrl = async (url: string) => {

  fetch(`http://localhost:5000/v1/api/transform/${url}`)
    .then((response) => response.blob())
    .then((data) => {
      console.log(data);
      return data
    });
    
}