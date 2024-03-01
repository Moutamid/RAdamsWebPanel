import Button from "@/Components/Buttons";
import ArrowRight from "@/assets/ArrowRight";
import ArrowLeft from "@/assets/ArrowLeft";
import { Button as PButton } from "primereact/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const actionBody = rowData => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-1">
      <PButton className="" onClick={() => navigate(`/ticket/view/${rowData._id}`)}>
        View
      </PButton>
    </div>
  );
};

export const userActionBody = rowData => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-1">
      <PButton className="" onClick={() => navigate(`/user/edit/${rowData._id}`)}>
        Edit
      </PButton>
    </div>
  );
};

export const colors = {
  bluePrimary: {
    25: "#F5FBFF",
    50: "#F0F9FF",
    100: "#E0F2FE",
    200: "#B9E6FE",
    300: "#7CD4FD",
    400: "#36BFFA",
    500: "#0BA5EC",
    600: "#0086C9",
    700: "#026AA2",
    800: "#065986",
    900: "#0B4A6F",
  },
  primary: {
    25: "#F5FBFF",
    50: "#F0F9FF",
    100: "#E0F2FE",
    200: "#B9E6FE",
    300: "#7CD4FD",
    400: "#36BFFA",
    500: "#0BA5EC",
    600: "#0086C9",
    700: "#026AA2",
    800: "#065986",
    900: "#0B4A6F",
  },
  grayCustom: {
    50: "#F9FAFB",
    100: "#F2F4F7",
    200: "#E4E7EC",
    300: "#D0D5DD",
    400: "#98A2B3",
    500: "#667085",
    600: "#475467",
    700: "#344054",
    800: "#1D2939",
    900: "#101828",
  },
  error: {
    100: "#FEE4E2",
    200: "#FECDCA",
    300: "#FDA29B",
    500: "#F04438",
    600: "#D92D20",
    700: "#B42318",
  },
  success: {
    50: "#ECFDF3",
    500: "#12B76A",
    600: "#039855",
    700: "#027A48",
  },
  blueCustom: {
    50: "#EFF8FF",
    700: "#175CD3",
  },
  indigoCustom: {
    50: "#EEF4FF",
    700: "#3538CD",
  },
};

export const paginationTemplate = {
  PrevPageLink: options => {
    return (
      <Button
        onClick={options.onClick}
        disabled={options.disabled}
        size="sm"
        color="gray"
        position="left"
        className=""
        icon={() => (
          <ArrowLeft
            stroke={colors["grayCustom"][700]}
            disabledStroke={colors["grayCustom"][300]}
            disabled={options.disabled}
            height={18}
            width={18}
          />
        )}
      >
        Previous
      </Button>
    );
  },
  PageLinks: options => {
    if (
      (options.view.startPage === options.page && options.view.startPage !== 0) ||
      (options.view.endPage === options.page && options.page + 1 !== options.totalPages)
    ) {
      return <span style={{ userSelect: "none" }}>...</span>;
    }

    const { page } = options;
    const isCurrentPage = options.currentPage === page;

    return (
      <button
        onClick={options.onClick}
        className={`${options.className}${isCurrentPage ? " bg-primary-50  text-primary-600" : "inherit"}`}
        style={{ borderRadius: "8px" }}
      >
        {options.page + 1}
      </button>
    );
  },

  NextPageLink: options => {
    return (
      <Button
        onClick={options.onClick}
        disabled={options.disabled}
        size="sm"
        className=""
        color="gray"
        icon={() => (
          <ArrowRight
            stroke={colors["grayCustom"][700]}
            disabledStroke={colors["grayCustom"][300]}
            disabled={options.disabled}
            height={18}
            width={18}
          />
        )}
      >
        Next
      </Button>
    );
  },
};
