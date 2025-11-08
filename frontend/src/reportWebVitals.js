/**

 * Minimal reportWebVitals placeholder so CRA-style imports don't fail.

 * Optionally forwards metrics to a callback if provided.

 */

export default function reportWebVitals(onPerfEntry) {

  if (onPerfEntry && typeof onPerfEntry === 'function') {

    // load web-vitals only when a handler is provided

    import('web-vitals')

      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {

        try {

          getCLS(onPerfEntry);

          getFID(onPerfEntry);

          getFCP(onPerfEntry);

          getLCP(onPerfEntry);

          getTTFB(onPerfEntry);

        } catch (e) {

          // ignore any runtime errors from web-vitals

        }

      })

      .catch(() => {

        // web-vitals not available, ignore

      });

  }

}