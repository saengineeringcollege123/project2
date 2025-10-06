import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Star, CheckCircle, Trash2 } from "lucide-react";
import { Shop } from "../../types";
import ConfirmDialog from "./ConfirmDialog";
import { deleteShop } from "../../services/api";

interface ShopCardProps {
  shop: Shop;
  onDeleted?: (id: string) => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, onDeleted }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setConfirmOpen(false);
      await deleteShop(shop.id);
      if (onDeleted) onDeleted(shop.id);
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-48 object-cover"
        />
        {localStorage.getItem("auth_role") === "admin" && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setConfirmOpen(true);
            }}
            disabled={deleting}
            className={`absolute top-2 right-2 ${
              deleting ? "opacity-60 cursor-not-allowed" : "hover:bg-white"
            } bg-white/90 text-red-600 p-2 rounded-full shadow`}
            title="Delete shop"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
        {shop.verified && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full flex items-center space-x-1 text-xs">
            <CheckCircle className="h-3 w-3" />
            <span>Verified</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="text-sm text-gray-600">{shop.rating}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{shop.address}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <Phone className="h-4 w-4" />
            <span>{shop.phone}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {shop.category}
          </span>
          <Link
            to={`/shop/${shop.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
          >
            View Shop
          </Link>
        </div>
      </div>
      {confirmOpen && (
        <ConfirmDialog
          title="Delete shop?"
          message="This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
};

export default ShopCard;
