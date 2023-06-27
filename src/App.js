import logo from './logo.svg';
import './App.css';

// returns table row with <th> element to display the label (tableheader) per category.
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

// Returns table row with 2 columns, "product name" & "product price"
function ProductRow({ product }) {
  // IF product has stock, name will be "product.name"
  // ELSE "name" will be in a red span tag to display the product name in a alert color.
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// ProductTable returns complete table with all table category headers and product rows
function ProductTable({ products }) {
  // create array "rows" to add the product category labels and product rows.
  const rows = [];
  // initialize lastCategory variable with value null 
  let lastCategory = null;

  // foreach product from "products", has argument "product" in arrow function provided by the .forEach() function
  products.forEach((product) => {
    // IF product.category is not equal to lastCategory, add ProductCategoryRow element with product category values to end of "rows" array.
    // When the product category is not equal to lastCategory, that means products now are in a different category and that's why it's time for the new category label.
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    // Add ProductRow element to end of "rows" array with the "product" object and product name.
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// SearchBar will search based on user input
function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

// Highest component FilterableProductTable with SearchBar and ProductTable, with "{products}" argument
// to pass onto ProductTable component, which returns a complete table element in JSX.
function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

// Sample product data, constant PRODUCTS initialized
const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

// App function simply only returns the return of FilterableProductTable. 
// FilterableProductTable get's the sample data from the PRODUCTS array into the products prop
export default function App() {
  return <FilterableProductTable products={PRODUCTS} />
}

