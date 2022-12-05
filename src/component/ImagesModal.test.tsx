import React from "react";
import ImagesModal from "./ImagesModal";
import { render } from "@testing-library/react";
import configureMockStore, { MockStore } from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureMockStore([]);
let store: MockStore;

const initialState = {
  imageList: ["test.jpg", "test2.jpg"] as any[],
};

describe("components / app / ImagesModal", () => {
  it("should match the snapshot", () => {
    store = mockStore({ breed: initialState });
    const { asFragment } = render(
      <Provider store={store}>
        <ImagesModal />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
