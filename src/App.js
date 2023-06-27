import { useState } from 'react';

// Highest component FilterableProductTable with SearchBar and ProductTable, with "{products}" argument
// to pass onto ProductTable component, which returns a complete table element in JSX.
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

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
  // IF product has stock, {name} will be "product.name"
  // ELSE {name} will be in a red span tag to display the product name in a alert font color.
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  // return table row, with 2 columns with product info: {name} and {product.price}.
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// ProductTable returns complete table with all table category headers and product rows
function ProductTable({ products, filterText, inStockOnly }) {
  // create rows array, will be filled with table row data
  const rows = [];
  // initialize variable to check the category change for recognizing the right moment for a category lable/title
  let lastCategory = null;

  // forEach() function on products array, supplies the product argument in the arrow function
  products.forEach((product) => {
    // IF indexOf() function does not find occurrence of the search string from {filterText}
    // {return;} without value, skip the current product, so will the products be filtered out. 
    if (
      // 
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    // if inStockOnly checkbox is selected and product.stocked is false, skip out of stock product with empty {return;}
    if (inStockOnly && !product.stocked) {
      return;
    }
    // on category change, add table header row with category name
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    // if function comes here, the product wasn't filtered out and ProductRow component
    // for the product will be added and the row will be in the table.
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    // register last product category to check for category change.
    lastCategory = product.category;
  });

  // return complete product table
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

// SearchBar will search based on user text input field and inStock checkbox
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      {/* Text search field, onChange calls setFilterText() function from FilterableProductTable to change state value */}
      {/* onChange provides the ArrowFunction with argument e, where e.target refers to the current html tag */}
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        {/* onInStockOnlyChange calls the setStockOnly function in FilterableProductTable where the state is and will be set to different value onChange*/}
        {/* onChange provides the ArrowFunction with argument e, where e.target refers to the current html tag */}
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

// Product sample data array initialized as constant PRODUCTS
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
  return <FilterableProductTable products={PRODUCTS} />;
}