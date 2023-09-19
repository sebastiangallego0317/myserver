const mysql = require("mysql2");
const Product = require("../models/product");


const connection = mysql.createConnection({
  host: "localhost", 
  user: "root",
  password: "",
  database: "tiendavirtual",
});

connection.connect();

class ProductRepository {
  static getAllProducts(callback) {
    connection.query("SELECT * FROM productos", (error, results) => {
      if (error) throw error;

      const products = results.map(
        (row) => new Product(row.id, row.nombre, row.precio)
      );
      callback(products);
    });
  }

  static getProductById(id, callback) {
    connection.query(
      "SELECT * FROM productos WHERE id = ?",
      [id],
      (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
          const productData = results[0];
          const product = new Product(
            productData.id,
            productData.nombre,
            productData.precio
          );
          callback(product);
        } else {
          callback(null);
        }
      }
    );
  }

  static addProduct(product, callback) {
    connection.query(
      "INSERT INTO productos (id, nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?, ?)",
      [
        product.id,
        product.nombre,
        product.descripcion,
        product.precio,
        product.stock,
      ],
      (error, results) => {
        if (error) throw error;

        const newProductId = results.insertId;
        callback(newProductId);
      }
    );
  }

  static updateProduct(product, callback) {
    connection.query(
      "UPDATE productos SET nombre = ?, precio = ? WHERE id = ?",
      [product.nombre, product.precio, product.id],
      (error) => {
        if (error) throw error;

        callback();
      }
    );
  }

  static deleteProduct(id, callback) {
    connection.query("DELETE FROM productos WHERE id = ?", [id], (error) => {
      if (error) throw error;

      callback();
    });
  }
}

module.exports = ProductRepository;
