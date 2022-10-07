import * as React from "react";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRange, DateRangePicker } from "@mui/x-date-pickers-pro";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  Box,
  Divider,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";

const DatePickerTogglePanel: React.FC<{
  children: React.ReactNode;
  setShowSingleDatePicker;
  showSingleDatePicker: boolean;
}> = ({ children, setShowSingleDatePicker, showSingleDatePicker }) => {
  return (
    <React.Fragment>
      <Box sx={{ margin: "0.5rem 0" }}>
        <Typography variant="overline" sx={{ marginLeft: "0.5rem" }}>
          {showSingleDatePicker
            ? "Select a date range"
            : "Select a single date"}
        </Typography>
        <Box display="flex">
          <Switch
            checked={showSingleDatePicker}
            onChange={() => setShowSingleDatePicker(!showSingleDatePicker)}
          />
        </Box>
        <Divider />
        {children}
      </Box>
    </React.Fragment>
  );
};

export default function PaperContentComponent() {
  const [dateRange, setDateRange] = React.useState<DateRange<Dayjs>>([
    null,
    null
  ]);
  const [singleDate, setSingleDate] = React.useState<Dayjs | null>(null);
  const [showSingleDatePicker, setShowSingleDatePicker] = React.useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={4} alignItems="center">
        {showSingleDatePicker ? (
          <DesktopDatePicker
            label="Date desktop"
            // inputFormat="MM/dd/yyyy"
            value={singleDate}
            onChange={(singleDate) => setSingleDate(singleDate)}
            renderInput={(params) => <TextField {...params} />}
            components={{ PaperContent: DatePickerTogglePanel }}
            componentsProps={{
              paperContent: {
                setSingleDate,
                setShowSingleDatePicker,
                showSingleDatePicker
              }
            }}
            open
          />
        ) : (
          <DateRangePicker
            onChange={(newValue) => setDateRange(newValue)}
            value={dateRange}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
            components={{ PaperContent: DatePickerTogglePanel }}
            PaperProps={{ sx: { display: "flex", flexDirection: "row" } }}
            componentsProps={{
              paperContent: {
                setShowSingleDatePicker,
                showSingleDatePicker
              }
            }}
            open
          />
        )}
      </Stack>
    </LocalizationProvider>
  );
}
