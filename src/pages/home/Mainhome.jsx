import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TopSlider from "./TopSlider";

import { setImageURL } from "../../config";
import { fetchHomeData } from "../../store/slices/home.slice";

import HeroSection from "./HeroSection";
import FeaturedCategories from "./FeaturedCategories";
import FeaturedProducts from "./FeaturedProducts";
import BestSellingProducts from "./BestSellingProducts";
import FlashSale from "./FlashSale";
import CustomerReviews from "./CustomerReviews";
import OfferBanner from "./OfferBanner";

export default function Mainhome() {
  const [home, setHome] = useState(null);
  const [loadError, setLoadError] = useState("");

  const { data, loading, error } = useSelector(
    (state) => state.homepage
  );

  const dispatch = useDispatch();

  // Fetch Home Data
  useEffect(() => {
    if (data.length === 0 && !loading && !error) {
      dispatch(fetchHomeData());
    }
  }, [dispatch, data.length, loading, error]);

  // Update local home state
  useEffect(() => {
    if (error) {
      setLoadError(error);
      return;
    }

    if (data && data.length !== 0) {
      setHome(data);
    }
  }, [data, error]);

  // Error UI
  if (loadError) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Home page load nahi ho paaya
          </h1>

          <p className="mt-2 text-slate-500">
            {loadError}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Loading UI
  if (!home) {
    return (
      <div className="min-h-screen animate-pulse bg-slate-50" />
    );
  }

  const hero = home.heroBanners?.[0];

  return (
    <main className="overflow-hidden bg-white">

      {/* Hero */}
      <HeroSection hero={hero} />

      {/* Top Categories Slider */}
      <TopSlider
        categories={home.topCategories || []}
        setImageURL={setImageURL}
      />

      {/* Featured Categories */}
      {/* <FeaturedCategories
        categories={home.featuredCategories || []}
      /> */}

      {/* Featured Products */}
      <FeaturedProducts
        products={home.featuredProducts || []}
      />

      {/* Offer */}
      <OfferBanner offer={home.offer} />

      {/* Best Selling */}
      <BestSellingProducts
        products={home.bestSellingProducts || []}
      />

      {/* Flash Sale */}
      <FlashSale
        products={home.flashSaleProducts || []}
      />

      {/* Reviews */}
      <CustomerReviews
        reviews={home.reviews || []}
      />

      {/* Newsletter */}
      {/* <Newsletter /> */}

    </main>
  );
}
