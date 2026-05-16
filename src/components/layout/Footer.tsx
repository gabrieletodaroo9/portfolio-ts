export default function Footer() {
  return (
    <footer className="text-muted py-3 border-top">
      <div className="d-flex justify-content-center align-items-center">
        <div className="small order-2 order-sm-1 fw-semibold">
          &copy; {new Date().getFullYear()} My personal Portfolio. All rights reserved.
        </div>

      </div>
    </footer>
  );
}