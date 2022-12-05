import React from "react";
import ImagesModal from "../component/ImagesModal";
import { render, cleanup, screen } from "@testing-library/react";
import configureMockStore, { MockStore } from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureMockStore([]);
let store: MockStore;

const initialState = {
  imageList: ["test.jpg", "test2.jpg"] as any[],
};

afterEach(cleanup);

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

  it("should show an alert if there are no images", () => {
    store = mockStore({ breed: {
      imageList: []
    } });
    render(
      <Provider store={store}>
        <ImagesModal isOpen={true} handleClose={jest.fn} />
      </Provider>
    );

    const alertText = screen.getByText("No images to display. Please make a selection.");
    expect(alertText).toBeInTheDocument();
  });

  it("should show dog poster gallery title", () => {
    store = mockStore({ breed: {
      imageList: [
        'img1.jpg',
        'img2.jpg'
      ]
    } });
    render(
      <Provider store={store}>
        <ImagesModal isOpen={true} handleClose={jest.fn} />
      </Provider>
    );

    const titleText = screen.getByText(/Dog Poster Gallery/i);
    
    expect(titleText).toBeInTheDocument();
  });

  it("should show dog poster gallery image count", () => {
    store = mockStore({ breed: {
      imageList: [
        'img1.jpg',
        'img2.jpg'
      ]
    } });
    render(
      <Provider store={store}>
        <ImagesModal isOpen={true} handleClose={jest.fn} />
      </Provider>
    );

    const numberText = screen.getByText(/2 images/i);
    expect(numberText).toBeInTheDocument();
  });

  it("should contain 2 images", () => {
    store = mockStore({ breed: {
      imageList: [
        'img1.jpg',
        'img2.jpg'
      ]
    } });
    render(
      <Provider store={store}>
        <ImagesModal isOpen={true} handleClose={jest.fn} />
      </Provider>
    );

    const imageOne = screen.getByAltText("img1.jpg");
    const imageTwo = screen.getByAltText("img2.jpg");
    expect(imageOne).toBeInTheDocument();
    expect(imageTwo).toBeInTheDocument();
  });
});
