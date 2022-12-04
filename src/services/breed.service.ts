import http from "../http-common";
import axios from "axios";
import uniq from "lodash/uniq";

export interface Breeds {
  breed: string;
  subBreed: string;
}

class BreedDataService {
  getAll() {
    return http.get("/breeds/list/all");
  }
  getImages(breeds: any[]) {
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

    return axios.all(apiCalls).then((res: any) => {
      let images: any[] = [];
      res.map((apiCall: any) => {
        return (images = [...images, ...apiCall.data.message]);
      });
      return uniq(images);
    });
  }
  getImageCount(breed: Breeds) {
    if (breed.breed && !breed.subBreed) {
      return http.get(`/breed/${breed.breed}/images`).then((res) => {
        return res.data.message.length;
      });
    } else if (breed.breed && breed.subBreed) {
      return http
        .get(`/breed/${breed.breed}/${breed.subBreed}/images`)
        .then((res) => {
          return res.data.message.length;
        });
    } else {
      return null;
    }
  }
}

export default new BreedDataService();
