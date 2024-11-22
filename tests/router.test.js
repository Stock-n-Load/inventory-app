const request = require("supertest");
const express = require("express");
const { Item } = require("../server/models/index");
const router = require("../server/routes/items");

jest.mock("../server/models/index");

const app = express();
app.use(router);

describe("Item API routes", () => {
  const mockItem = {
    id: 1,
    name: "Test Item",
    description: "Test description",
    price: 10,
    category: "Test Category",
    image: "test-image-url",
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("GET / - Should return all items", async () => {
    Item.findAll.mockResolvedValue([mockItem]);

    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockItem]);
    expect(Item.findAll).toHaveBeenCalledTimes(1);
  });

  test("GET /:id - Should return a single item by ID", async () => {
    Item.findByPk.mockResolvedValue(mockItem);

    const response = await request(app).get("/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockItem);
    expect(Item.findByPk).toHaveBeenCalledWith("1");
  });

  test("POST /new - Should create a new item", async () => {
    const newItemData = {
      name: "New Item",
      description: "New description that is at least 10 chars",
      price: 20,
      category: "New Category",
      image: "www.new-image-url.com"
    };

    Item.create.mockResolvedValue(mockItem);

    const response = await request(app)
      .post("/new")
      .send(newItemData)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockItem);
    expect(Item.create).toHaveBeenCalledWith(newItemData);
  });

  it("should delete an item by ID", async () => {
    const mockItem = {
      name: "New Item",
      description: "New description that is at least 10 chars",
      price: 20,
      category: "New Category",
      image: "www.new-image-url.com",
      destroy: jest.fn().mockResolvedValue(true)
    };
  
    Item.findByPk.mockResolvedValue(mockItem);
  
    const response = await request(app).delete(`/${mockItem.id}`);
  
    expect(response.status).toBe(204);
  
    expect(mockItem.destroy).toHaveBeenCalledTimes(1);
  });
  

  test("PUT /:id - Should update an item", async () => {
    const updatedItemData = {
      name: "New Item",
      description: "New description that is at least 10 chars",
      price: 20,
      category: "New Category",
      image: "www.new-image-url.com"
    };

    Item.findByPk.mockResolvedValue(mockItem);
    Item.update.mockResolvedValue([1]);

    const response = await request(app)
      .put("/1")
      .send(updatedItemData)
      .set("Accept", "application/json");

    expect(response.status).toBe(202);
    expect(response.body).toEqual(mockItem);
    expect(Item.update).toHaveBeenCalledWith(updatedItemData, {
      where: { id: "1" },
    });
    expect(Item.findByPk).toHaveBeenCalledWith("1");
  });
});
