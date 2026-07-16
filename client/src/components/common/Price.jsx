const Price = ({ price, offerPrice }) => {
  const hasOffer = offerPrice && offerPrice < price;
  return (
    <div className="flex items-center gap-3">
      {hasOffer && <span className="text-zinc-400 line-through text-sm">₹{price}</span>}
      <span className="text-xl font-black">₹{hasOffer ? offerPrice : price}</span>
    </div>
  );
};
export default Price;