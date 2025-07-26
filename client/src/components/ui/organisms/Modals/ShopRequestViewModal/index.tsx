"use client";
import NextImage from "@/components/ui/atoms/common/NextImage";
import ModalWrapper from "@/components/ui/molecules/ModalWrapper";
import { useShopRequestStore } from "@/stores/shop-request-store";
import { CgClose } from "react-icons/cg";
import {
  HiOutlineUser,
  HiOutlineMapPin,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiBuildingStorefront,
} from "react-icons/hi2";
import { useState } from "react";
import { HiMail } from "react-icons/hi";
import { formateDate } from "@/utils";

const ShopRequestReviewModal = () => {
  const { isOpen, shop, handleCloseModal } = useShopRequestStore();

  if (!shop) return null;

  const {
    logo,
    about,
    address,
    email,
    contact,
    createdAt: requested_on,
    owner: owner_name,
    shop_name,
    zip_code,
  } = shop;

  return (
    <ModalWrapper
      isOpen={isOpen}
      className="lg:max-w-[900px] max-w-[95vw] mx-4 lg:mx-auto lg:max-h-[90vh] max-h-[95vh] rounded-2xl overflow-hidden"
    >
      <div className="flex flex-col h-full bg-white  shadow-2xl">
        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-6 py-8 text-white">
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all duration-200 z-10"
          >
            <CgClose size={24} className="text-white" />
          </button>

          {/* Shop Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pr-12">
            <div className="relative group">
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <NextImage
                  src={logo}
                  alt={`${shop_name} Logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                <HiBuildingStorefront size={16} className="text-primary" />
              </div>
            </div>

            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
                {shop_name}
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <span className="text-sm font-medium text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Pending Review
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-white/90">
                <HiOutlineCalendar size={16} />
                <span className="text-sm">
                  Requested on {formateDate(requested_on)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Owner Information Card */}
            <div className="group bg-gradient-to-br from-light-gray to-white rounded-xl p-6 border border-ultra-light hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <HiOutlineUser size={20} className="text-primary" />
                </div>
                <h3 className="font-bold text-charcoal text-lg">
                  Owner Information
                </h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-ultra-light">
                  <label className="text-xs font-semibold text-cool-gray uppercase tracking-wide mb-1 block">
                    Full Name
                  </label>
                  <p className="text-charcoal font-semibold text-lg">
                    {owner_name}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="group bg-gradient-to-br from-light-gray to-white rounded-xl p-6 border border-ultra-light hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <HiMail size={20} className="text-primary" />
                </div>
                <h3 className="font-bold text-charcoal text-lg">
                  Contact Details
                </h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-ultra-light">
                  <label className="text-xs font-semibold text-cool-gray uppercase tracking-wide mb-1 block">
                    Email Address
                  </label>
                  <p className="text-charcoal font-medium break-all">{email}</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-ultra-light">
                  <label className="text-xs font-semibold text-cool-gray uppercase tracking-wide mb-1 block">
                    Phone Number
                  </label>
                  <p className="text-charcoal font-medium">{contact}</p>
                </div>
              </div>
            </div>

            {/* Address Information Card */}
            <div className="group bg-gradient-to-br from-light-gray to-white rounded-xl p-6 border border-ultra-light hover:shadow-lg transition-all duration-300 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <HiOutlineMapPin size={20} className="text-primary" />
                </div>
                <h3 className="font-bold text-charcoal text-lg">
                  Shop Address
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-white rounded-lg p-3 border border-ultra-light">
                  <label className="text-xs font-semibold text-cool-gray uppercase tracking-wide mb-1 block">
                    Full Address
                  </label>
                  <p className="text-charcoal font-medium leading-relaxed">
                    {address}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-ultra-light">
                  <label className="text-xs font-semibold text-cool-gray uppercase tracking-wide mb-1 block">
                    ZIP Code
                  </label>
                  <p className="text-charcoal font-semibold text-lg">
                    {zip_code}
                  </p>
                </div>
              </div>
            </div>

            {/* About Section */}
            {about && (
              <div className="group bg-gradient-to-br from-light-gray to-white rounded-xl p-6 border border-ultra-light hover:shadow-lg transition-all duration-300 lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                    <HiOutlineDocumentText size={20} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-charcoal text-lg">
                    About the Shop
                  </h3>
                </div>
                <div className="bg-white rounded-lg p-4 border border-ultra-light">
                  <p className="text-charcoal-gray leading-relaxed whitespace-pre-line text-sm lg:text-base">
                    {about}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ShopRequestReviewModal;
