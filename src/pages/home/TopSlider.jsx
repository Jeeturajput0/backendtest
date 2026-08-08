import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const TopSlider = ({ categories = [], setImageURL }) => (
  <section className="border-y border-slate-100 bg-slate-50 py-10">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">
          Popular departments
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Top Categories
        </h2>
      </div>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2800, disableOnInteraction: false }}
        spaceBetween={16}
        breakpoints={{
          320: { slidesPerView: 2.1 },
          640: { slidesPerView: 3.2 },
          768: { slidesPerView: 4.2 },
          1024: { slidesPerView: 6 },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="overflow-hidden rounded-2xl bg-white p-3 shadow-sm">
              <img
                src={setImageURL(category.image)}
                alt={category.title}
                className="h-28 w-full rounded-xl object-cover"
              />
              <p className="mt-3 truncate text-center font-semibold text-slate-800">
                {category.title}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default TopSlider;
