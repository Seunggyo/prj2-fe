import { Box } from "@chakra-ui/react";
import DsView from "../../page/ds/DsView";

export function ViewComponent({ dsId }) {
  return (
    <Box>
      <DsView dsId={dsId} />
    </Box>
  );
}
