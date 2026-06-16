import { useEffect } from 'react';

export function usePageViewAnalytics(page: string) {
  useEffect(() => {
    if (window.fbq) {
      window.fbq('trackCustom', 'PageView', { page });
    }
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: page,
        page_location: window.location.href,
      });
    }
  }, [page]);
}

export function trackViewProduct(productId: string, value: number) {
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_ids: [productId],
      content_type: 'product',
      value,
      currency: 'INR',
    });
  }
  if (window.gtag) {
    window.gtag('event', 'view_item', {
      items: [{ id: productId }],
      value,
      currency: 'INR',
    });
  }
}

export function trackInitiateCheckout(total: number, count: number) {
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      value: total,
      currency: 'INR',
      num_items: count,
    });
  }
  if (window.gtag) {
    window.gtag('event', 'begin_checkout', {
      value: total,
      currency: 'INR',
      items: count,
    });
  }
}
