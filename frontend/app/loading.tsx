const styles = {
  overlay:
    "fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50",
  spinner: "animate-spin h-12 w-12 border-4 rounded-full border-gray-300",
};

export default function Loading() {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner} style={{ borderTopColor: "#219ebc" }} />
    </div>
  );
}
