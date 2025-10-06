import React, { useState } from "react";
import { Calendar, Tag, Trash2 } from "lucide-react";
import { Offer } from "../../types";
import ConfirmDialog from "./ConfirmDialog";
import { deleteOffer } from "../../services/api";

interface OfferCardProps {
  offer: Offer;
  onDeleted?: (id: string) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onDeleted }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      setConfirmOpen(false);
      await deleteOffer(offer.id);
      if (onDeleted) onDeleted(offer.id);
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };
  const startDate = new Date(offer.startDate).toLocaleDateString();
  const endDate = new Date(offer.endDate).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={offer.image}
          alt={offer.title}
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
            title="Delete offer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
        <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full flex items-center space-x-1">
          <Tag className="h-4 w-4" />
          <span className="font-semibold">{offer.discount} OFF</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {offer.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{offer.description}</p>

        <div className="flex items-center space-x-2 text-gray-600 text-sm mb-3">
          <Calendar className="h-4 w-4" />
          <span>
            {startDate} - {endDate}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-600 font-medium">
            {offer.shopName}
          </span>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            View Offer
          </button>
        </div>
      </div>
      {confirmOpen && (
        <ConfirmDialog
          title="Delete offer?"
          message="This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
};

export default OfferCard;
