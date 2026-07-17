import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAddToOwned?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

const ProductGrid = ({
  products,
  onAddToOwned,
  onAddToWishlist,
  onViewDetails,
}: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
        <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
          No collectibles found
        </h3>

        <p className="mt-2 max-w-sm text-sm text-slate-600 sm:text-base">
          Try adjusting your search or filters to find more items.
        </p>
      </div>
    );
  }

  return (
    <section
      aria-label="Product listings"
      className="grid w-full grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToOwned={() => onAddToOwned?.(product)}
          onAddToWishlist={() => onAddToWishlist?.(product)}
          onViewDetails={() => onViewDetails?.(product)}
        />
      ))}
    </section>
  );
};

export default ProductGrid;