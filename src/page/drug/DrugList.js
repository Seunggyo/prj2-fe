import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { TbReportMedical } from "react-icons/tb";
import { Cart } from "./Cart";
import { DrugPagination } from "./DrugPagination";
import { DrugSearchComponent } from "./DrugSearchComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export function DrugList() {
  const [drugList, setDrugList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get("/api/drug/drugList?" + params).then((response) => {
      setDrugList(response.data.drugList);
      setPageInfo(response.data.pageInfo);
    });
  }, [location]);

  if (drugList === null) {
    return <Spinner />;
  }

  return (
    <Box marginRight="40px">
      <section className="min-h-screen w-full py-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
            {/*첫번째 */}
            {drugList.map((drug) => (
              <div
                key="drug.id"
                className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300"
              >
                <div>
                  <div>
                    <Image src={drug.files[0].url} />
                  </div>
                  <div className="mt-10 text-center text-zinc-600 dark:text-zinc-400">
                    <span className="text-5xl font-dongle font-semibold">
                      {drug.name}
                    </span>
                    <span className=" text-3xl font-dongle ">
                      / {drug.func}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 ">
                    <li className=" flex items-center text-4xl font-dongle font-semibold ">
                      {/*<IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />*/}
                      <TbReportMedical />
                      {drug.price}원
                    </li>
                  </ul>
                </div>
                <div className="mt-5">
                  <Button
                    className="w-full"
                    bg="green.600"
                    color="white"
                    onClick={() => navigate("/home/drug/" + drug.id)}
                  >
                    주문하기
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Center marginTop="20px">
        <DrugSearchComponent />
      </Center>
      <Center marginTop="20px">
        <DrugPagination pageInfo={pageInfo} />
      </Center>
    </Box>
  );
}
// </Box>

function IconCheck(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
