function CategoryForm() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Category Form
      </h2>

      <form className="bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Category Name"
          className="border p-2 w-full mb-3"
        />

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}

export default CategoryForm;