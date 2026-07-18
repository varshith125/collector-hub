import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";
import EmptyState from "../common/EmptyState";

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
      <EmptyState
        title="No collectibles found"
        description="Try adjusting your search or filters to find more items."
      />
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