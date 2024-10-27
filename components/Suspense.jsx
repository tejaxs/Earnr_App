// hoc/withSuspense.js
import { Suspense } from "react";

// HOC to wrap component with Suspense
const withSuspense = (WrappedComponent, fallback = <div>Loading...</div>) => {
  return (props) => (
    <Suspense fallback={fallback}>
      <WrappedComponent {...props} />
    </Suspense>
  );
};

export default withSuspense;
