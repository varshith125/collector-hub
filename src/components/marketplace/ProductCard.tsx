import type { Product } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductCardProps {
    product: Product;
    onAddToOwned?: () => void;
    onAddToWishlist?: () => void;
    onViewDetails?: () => void;
}

const ProductCard = ({
    product,
    onAddToOwned,
    onAddToWishlist,
    onViewDetails,
}: ProductCardProps) => {
    const fallbackImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80";

    return (
        <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <button
                type="button"
                onClick={onViewDetails}
                className="aspect-square w-full overflow-hidden bg-slate-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-950 dark:bg-slate-800 dark:focus:ring-white focus:ring-offset-2"
                aria-label={`View details for ${product.title}`}
            >
                <img
                    src={product.image || fallbackImage}
                    alt={product.title}
                    width={400}
                    height={400}
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                    }}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </button>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {product.category}
                    </span>

                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {product.condition}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={onViewDetails}
                    className="mt-3 text-left focus:outline-none group cursor-pointer"
                >
                    <h3 className="line-clamp-1 text-lg font-bold text-slate-900 group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-300 transition-colors">
                        {product.title}
                    </h3>
                </button>

                <span className="mt-1.5 text-xl font-extrabold text-slate-900 dark:text-white">
                    {formatCurrency(product.price)}
                </span>

                <div className="mt-4 flex flex-col gap-1 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <p>
                        Seller:{" "}
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                            {product.sellerName}
                        </span>
                    </p>

                    <p>
                        Location:{" "}
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                            {product.location}
                        </span>
                    </p>
                </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <button
                        type="button"
                        onClick={onAddToOwned}
                        className="flex-1 min-h-[44px] inline-flex items-center justify-center rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white outline-none hover:bg-slate-800 focus:ring-2 focus:ring-slate-900/20 cursor-pointer dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
                    >
                        Add to Collection
                    </button>

                    <button
                        type="button"
                        onClick={onAddToWishlist}
                        className="flex-1 min-h-[44px] inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 outline-none hover:bg-slate-50 focus:ring-2 focus:ring-slate-950/20 cursor-pointer dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                        Wishlist
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;