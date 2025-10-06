import React, { useEffect, useState } from "react";
import { Calendar, Plus } from "lucide-react";
import OfferCard from "../components/UI/OfferCard";
import { getOffers, createOffer, getShops } from "../services/api";
import { OfferFormData } from "../types";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBanner from "../components/UI/ErrorBanner";

const OffersPage: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [offers, setOffers] = useState([] as any[]);
  const [shops, setShops] = useState([] as any[]);
  const [selectedShopId, setSelectedShopId] = useState<string>("1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newOffer, setNewOffer] = useState<OfferFormData>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    discount: "",
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [o, s] = await Promise.all([getOffers(), getShops()]);
        setOffers(o);
        setShops(s);
        if (s.length > 0) setSelectedShopId(s[0].id);
      } catch (e) {
        console.error(e);
        setError("Failed to load offers");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createOffer({
        shopId: selectedShopId,
        title: newOffer.title,
        description: newOffer.description,
        startDate: newOffer.startDate,
        endDate: newOffer.endDate,
        discount: newOffer.discount,
      });
      setOffers((prev) => [created, ...prev]);
      setNewOffer({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        discount: "",
      });
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Current Offers & Events
            </h1>
            <p className="text-gray-600 mt-2">
              Discover amazing deals from local shops
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            <span>Add Event</span>
          </button>
        </div>

        {/* Add Offer Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Create New Event
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Shop
                </label>
                <select
                  value={selectedShopId}
                  onChange={(e) => setSelectedShopId(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {shops.map((s: any) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newOffer.title}
                    onChange={(e) =>
                      setNewOffer((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Black Friday Sale"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount
                  </label>
                  <input
                    type="text"
                    required
                    value={newOffer.discount}
                    onChange={(e) =>
                      setNewOffer((prev) => ({
                        ...prev,
                        discount: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 20%"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={newOffer.description}
                  onChange={(e) =>
                    setNewOffer((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your event..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newOffer.startDate}
                    onChange={(e) =>
                      setNewOffer((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newOffer.endDate}
                    onChange={(e) =>
                      setNewOffer((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Create Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Offers Grid */}
        {error && (
          <div className="mb-4">
            <ErrorBanner
              message={error}
              onRetry={() => window.location.reload()}
            />
          </div>
        )}
        {loading && <LoadingSpinner label="Loading offers..." />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onDeleted={(id) =>
                setOffers((prev) => prev.filter((o) => o.id !== id))
              }
            />
          ))}
        </div>

        {/* Empty State */}
        {offers.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No offers available
            </h3>
            <p className="text-gray-500">
              Be the first to add an exciting offer!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;
