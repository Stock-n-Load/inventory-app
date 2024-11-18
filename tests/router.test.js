const request = require("supertest");
const express = require("express");
const { Item } = require("../server/models/index");
const router = require("../server/routes/items"); // Update this path accordingly

jest.mock("../server/models/index"); // Mock the Item model

// Setup express app for testing
const app = express();
app.use(router);

describe("Item API routes", () => {
  // Mock data
  const mockItem = {
    id: 1,
    name: "Test Item",
    description: "Test description",
    price: 10,
    category: "Test Category",
    image: "test-image-url",
  };

  beforeEach(() => {
    // Reset all mocks before each test to avoid interference
    jest.resetAllMocks();
  });

  test("GET / - Should return all items", async () => {
    // Mock the Item.findAll method
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
      description: "New description",
      price: 20,
      category: "New Category",
      image: "new-image-url",
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
    // Mock the instance that will be returned by findByPk
    const mockItem = {
      id: 1,
      name: "Test Item",
      description: "Test description",
      price: 10,
      category: "Test Category",
      image: "test-image-url",
      destroy: jest.fn().mockResolvedValue(true), // Mock the destroy method
    };
  
    // Mock findByPk to return the mock item
    Item.findByPk.mockResolvedValue(mockItem);
  
    // Step 2: Send the DELETE request
    const response = await request(app).delete(`/${mockItem.id}`);
  
    // Step 3: Assert that the response status is 204 (No Content)
    expect(response.status).toBe(204);
  
    // Step 4: Verify the item was actually deleted by checking destroy was called
    expect(mockItem.destroy).toHaveBeenCalledTimes(1); // Ensure destroy method was called once
  });
  

  test("PUT /:id - Should update an item", async () => {
    const updatedItemData = {
      name: "Updated Item",
      description: "Updated description",
      price: 25,
      category: "Updated Category",
      image: "updated-image-url",
    };

    Item.findByPk.mockResolvedValue(mockItem);
    Item.update.mockResolvedValue([1]); // mock sequelize update result

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
