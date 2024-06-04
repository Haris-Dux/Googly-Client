<section className="pt-24 md:pt-28 lg:pt-10 pb-14 bg-white px-4 md:px-8 xl:px-0">
<div className="xl:max-w-5xl lg:max-w-5xl max-w-xl mx-auto min-h-screen flex items-center">
  <div className="grid lg:grid-cols-3 gap-8 w-full">
    <div className="lg:col-span-2">
      <h2 className="Noto text-3xl font-bold text-[#333]">Checkout</h2>
      <p className="text-[#333] text-base mt-5 max-w-lg">
        Complete your transaction swiftly and securely with our
        easy-to-use payment process.
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-5 max-w-lg"
      >
        <div className="mb-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="px-4 py-3 bg-gray-100 text-[#333] w-full text-md border rounded-md border-gray-500 focus:border-gray-800 outline-none placeholder:text-gray-500 transition-shadow duration-200 focus:shadow-xl"
          />
          <input
            type="number"
            placeholder="Enter Postal Code"
            className="px-4 py-3 bg-gray-100 text-[#333] w-full text-md border rounded-md border-gray-500 focus:border-gray-800 outline-none placeholder:text-gray-500 transition-shadow duration-200 focus:shadow-xl"
          />
        </div>

        <textarea
          rows={4}
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Enter Shipping Address"
          className="px-4 py-3 bg-gray-100 text-[#333] w-full text-md border rounded-md border-gray-500 focus:border-gray-800 outline-none placeholder:text-gray-500 transition-shadow duration-200 focus:shadow-xl"
          required
        ></textarea>

        <div className="buttons">
          <button
            type="button"
            className="mt-5 w-full py-3 text-md text-white hover:bg-black bg-[#252525]"
          >
            Order Now
          </button>
        </div>
      </form>
    </div>

    {/* AMOUNT DETAILS */}
    <div className="bg-gray-100 shadow-xl border border-gray-300 h-[17rem] p-6 rounded-md">
      <h2 className="Noto text-3xl font-bold text-[#333]">
        Rs {totalPrice + shippingCharges}
      </h2>
      <ul className="text-[#333] mt-10 space-y-6">
        <li className="flex flex-wrap gap-4 text-base">
          Subtotal{" "}
          <span className="ml-auto font-bold">Rs {totalPrice}</span>
        </li>
        <li className="flex flex-wrap gap-4 text-base">
          Shipping Charges{" "}
          <span className="ml-auto font-bold">
            Rs {shippingCharges}
          </span>
        </li>
        <li className="flex flex-wrap gap-4 text-base font-bold border-t-2 pt-4">
          Total{" "}
          <span className="ml-auto">
            Rs {totalPrice + shippingCharges}
          </span>
        </li>
      </ul>
    </div>
  </div>
</div>
</section>