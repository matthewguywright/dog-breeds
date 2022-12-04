import http from "../http-common";
import axios from "axios";

export interface Breeds {
  breed: string;
  subBreed: string;
}

class BreedDataService {
  getAll() {
    return http.get("/breeds/list/all");
  }
  getImages(breeds: Breeds[]) {
    const apiCalls = [] as any[];
    breeds.forEach((breed) => {
      if (!breed.subBreed) {
        apiCalls.push(http.get(`/breed/${breed.breed}/images`));
      } else {
        apiCalls.push(
          http.get(`/breed/${breed.breed}/${breed.subBreed}/images`)
        );
      }
    });

    return axios.all(apiCalls).then((results: any) => {
      console.log(results);
      return results;
    });
  }
  getImageCount(breed: string, subBreed: string) {
    if (!subBreed) {
      return http.get(`/breed/${breed}/images`);
    } else {
      return http.get(`/breed/${breed}/${subBreed}/images`);
    }
  }
  getSubBreeds(breed: string) {
    return http.get(`/breed/${breed}/list`);
  }
}

export default new BreedDataService();
