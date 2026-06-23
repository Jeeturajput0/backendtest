function CardForm() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Card Form</h2>

      <form className="bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Card Name"
          className="border p-2 w-full mb-3"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}

export default CardForm;