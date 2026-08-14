// components/shop/ProductCard.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

export function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product._id);
  const isInStock = product.inStock && product.quantity > 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isInStock) {
      toast.error('Out of stock');
      return;
    }
    addToCart(product._id, 1);
    toast.success('Added to cart!');
  };

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full"
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product._id);
        }}
      >
        <Heart className={`h-5 w-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
      </Button>

      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {!isInStock && (
            <Badge variant="destructive" className="absolute left-2 top-2">
              Out of Stock
            </Badge>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <Badge className="absolute left-2 top-2 bg-green-500 text-white">
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold hover:text-orange-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.shortDescription || product.description}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-orange-600">
            ₹{product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600" 
          disabled={!isInStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}