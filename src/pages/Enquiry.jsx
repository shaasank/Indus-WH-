import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Send, Paperclip, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';

const RECIPIENT_EMAIL = 'shashank1341@gmail.com';
const BASIN_ENDPOINT = 'https://usebasin.com/f/7ada9d583ec3';

const formatOrderDetails = (items) => {
  return items.map((item, index) => {
    const measurements = Object.entries(item.measurements || {})
      .filter(([, value]) => value)
      .map(([label, value]) => `    ${label}: ${value}`)
      .join('\n');

    const attachments = (item.attachments || [])
      .map((file) => `    ${file.name}`)
      .join('\n');

    return [
      `${index + 1}. ${item.name}`,
      `   Category: ${item.category}`,
      `   Quantity: ${item.quantity}`,
      item.note ? `   Note: ${item.note}` : '',
      measurements ? `   Measurements:\n${measurements}` : '',
      attachments ? `   Attached files:\n${attachments}` : '',
    ].filter(Boolean).join('\n');
  }).join('\n\n');
};

export default function Enquiry() {
  const { items, removeItem, clearCart, getTotalCount } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    const formData = new FormData(event.currentTarget);

    const buyerName = formData.get('buyerName');
    const companyName = formData.get('companyName');
    const contactNumber = formData.get('contactNumber');
    const deliveryAddress = formData.get('deliveryAddress');
    const orderDetails = formatOrderDetails(items);

    formData.set('form_name', 'Indus Heaters Enquiry');
    formData.set('recipient_email', RECIPIENT_EMAIL);
    formData.set('order_details', orderDetails);
    formData.set('cart_item_count', String(getTotalCount()));
    formData.set('subject', `Indus Heaters Enquiry - ${companyName || buyerName}`);

    const attachmentFiles = formData.getAll('attachments').filter((file) => file instanceof File && file.size > 0);
    formData.delete('attachments');
    attachmentFiles.forEach((file) => formData.append('attachments[]', file));

    setLoading(true);

    fetch(BASIN_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('The enquiry could not be sent. Please try again.');
        }
        clearCart();
        navigate('/enquiry/success');
      })
      .catch((submitError) => {
        setError(submitError.message || 'The enquiry could not be sent. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="bg-white text-[#000000]">
      <div className="bg-[#FAFAFA] border-b border-[#E2E5EC]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="structural-line-left pl-8">
            <h1 className="font-heading text-5xl font-bold tracking-tight text-[#000000]">Send Enquiry</h1>
            <p className="text-[#6B7280] mt-4 max-w-lg font-body text-base leading-relaxed">
              Share your buyer details and delivery address. Your selected cart items will be included in the enquiry email.
            </p>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="max-w-7xl mx-auto px-6 py-28 flex flex-col items-center justify-center text-center border-b border-[#E2E5EC] bg-[#FAFAFA]/50">
          <div className="w-20 h-20 bg-[#F3F4F6] flex items-center justify-center mb-8">
            <ShoppingBag className="w-10 h-10 text-[#000000]" />
          </div>
          <h2 className="font-heading text-4xl font-bold mb-4 uppercase tracking-tight">Your cart is empty</h2>
          <p className="text-[#6B7280] mb-10 text-sm">Add products to your enquiry before sending.</p>
          <Link to="/products" className="bg-[#000000] text-white px-10 py-5 font-heading font-bold text-sm uppercase tracking-widest hover:bg-[#111827] transition-all flex items-center gap-3">
            Browse Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-[#E2E5EC] shadow-xl">
            <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-[#E2E5EC] bg-white">
              <div className="flex items-center justify-between px-8 py-6 bg-[#000000] text-white">
                <span className="font-heading text-base font-bold uppercase tracking-widest">Order Summary</span>
                <span className="text-sm text-white/70">{getTotalCount()} item{getTotalCount() === 1 ? '' : 's'}</span>
              </div>

              <div className="divide-y divide-[#E2E5EC]">
                {items.map((item) => (
                  <div key={item.id} className="p-6 sm:p-8 flex flex-col gap-5 group hover:bg-[#FAFAFA] transition-all">
                    <div className="flex gap-5">
                      <div className="w-24 h-24 bg-white border border-[#E2E5EC] shrink-0 flex items-center justify-center p-3">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#6B7280] mb-1">{item.category}</div>
                        <div className="font-heading text-lg font-bold text-[#000000] leading-tight mb-3">{item.name}</div>
                        <div className="inline-flex items-center border border-[#E2E5EC] bg-[#F3F4F6] px-3 py-2 text-xs font-bold text-[#000000] uppercase tracking-[0.12em]">
                          Quantity: {item.quantity}
                        </div>
                      </div>
                      <button type="button" onClick={() => removeItem(item.id)} className="text-[#C9CDD8] hover:text-red-500 transition-colors self-start pt-2" aria-label={'Remove ' + item.name}>
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {item.attachments?.length > 0 && (
                      <div className="border border-[#E2E5EC] bg-[#FAFAFA] p-4">
                        <div className="text-[10px] text-[#6B7280] uppercase tracking-[0.2em] mb-2 font-bold">Attached files</div>
                        <div className="space-y-1">
                          {item.attachments.map((file, index) => (
                            <div key={file.name + index} className="flex items-center gap-2 text-xs font-bold text-[#4B5563] truncate">
                              <Paperclip className="w-3.5 h-3.5 text-[#000000] shrink-0" />
                              <span className="truncate">{file.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-8 border-t border-[#E2E5EC] bg-[#FAFAFA]">
                <button onClick={clearCart} className="w-full text-center text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-500 transition-colors mb-6">
                  Clear Cart
                </button>
                <Link to="/products" className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-[#000000] border-2 border-[#000000] py-4 hover:bg-[#000000] hover:text-white transition-all">
                  Add More Products
                </Link>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              action={BASIN_ENDPOINT}
              method="POST"
              encType="multipart/form-data"
              className="lg:col-span-3 flex flex-col bg-white"
            >
              <div className="px-8 sm:px-10 py-8 border-b border-[#E2E5EC] bg-[#FAFAFA]">
                <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">Buyer Details</h2>
              </div>

              <div className="px-8 sm:px-10 py-10 space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <label className="block">
                    <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#6B7280] mb-2">Buyer Name *</span>
                    <input name="buyerName" required type="text" className="w-full border border-[#E2E5EC] px-4 py-3 text-sm text-[#000000] focus:border-[#000000] focus:outline-none" />
                  </label>

                  <label className="block">
                    <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#6B7280] mb-2">Company Name *</span>
                    <input name="companyName" required type="text" className="w-full border border-[#E2E5EC] px-4 py-3 text-sm text-[#000000] focus:border-[#000000] focus:outline-none" />
                  </label>
                </div>

                <label className="block">
                  <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#6B7280] mb-2">Contact Number *</span>
                  <input name="contactNumber" required type="tel" className="w-full border border-[#E2E5EC] px-4 py-3 text-sm text-[#000000] focus:border-[#000000] focus:outline-none" />
                </label>

                <label className="block">
                  <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#6B7280] mb-2">Delivery Address *</span>
                  <textarea name="deliveryAddress" required rows={6} className="w-full border border-[#E2E5EC] px-4 py-3 text-sm text-[#000000] focus:border-[#000000] focus:outline-none resize-y" />
                </label>

                <label className="block">
                  <span className="block text-xs font-bold uppercase tracking-[0.15em] text-[#6B7280] mb-2">Attach Files</span>
                  <input
                    name="attachments"
                    type="file"
                    multiple
                    className="w-full border border-dashed border-[#C9CDD8] bg-[#FAFAFA] px-4 py-4 text-sm text-[#4B5563] file:mr-4 file:border-0 file:bg-[#000000] file:px-4 file:py-2 file:text-sm file:font-bold file:uppercase file:tracking-wider file:text-white"
                  />
                  <p className="mt-2 text-xs text-[#6B7280]">
                    Upload drawings, sample images, or PDFs related to this enquiry.
                  </p>
                </label>

                {error && (
                  <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                  </div>
                )}
              </div>

              <div className="px-8 sm:px-10 py-10 mt-auto bg-[#FAFAFA] border-t border-[#E2E5EC]">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#000000] text-white py-5 font-heading font-bold text-base uppercase tracking-[0.2em] hover:bg-[#111827] transition-all disabled:opacity-60 flex items-center justify-center gap-3"
                >
                  {loading ? 'Preparing Email...' : 'Send Enquiry'}
                  {!loading && <Send className="w-5 h-5" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
