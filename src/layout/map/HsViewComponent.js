import { Box } from "@chakra-ui/react";
import { HsView } from "../../page/hs/HsView";

export function HsViewComponent({ hsId }) {
  return (
    <Box>
      <HsView hsId={hsId} />
    </Box>
  );
}
