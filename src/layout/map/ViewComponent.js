import { Box } from "@chakra-ui/react";
import DsView from "../../page/ds/DsView";

// Ds카카오 맵  뷰 파일
export function ViewComponent({ dsId }) {
  return (
    <Box>
      <DsView dsId={dsId} />
    </Box>
  );
}
