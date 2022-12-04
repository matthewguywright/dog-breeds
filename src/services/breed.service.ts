import http from "../http-common";
import axios from "axios";

class BreedDataService {
  getAll() {
    return http.get("/breeds/list/all");
  }
  getImages(breeds: any[]) {
    const apiCalls = [] as any[];
    breeds.forEach((breed) => {
      apiCalls.push();
    });
    axios.all(apiCalls).then((data) => {
      console.log(data);
    });
  }
  getImageCount(breed: string, subBreed = null) {
    if (!subBreed) {
      return http
        .get(`/breed/${breed}/images`)
        .then((res) => res.data.message.length);
    } else {
      return http
        .get(`/breed/${breed}/${subBreed}/images`)
        .then((res) => res.data.message.length);
    }
  }
  getSubBreeds(breed: string) {
    return http.get(`/breed/${breed}/list`);
  }
}

export default new BreedDataService();
