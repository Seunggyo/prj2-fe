import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Spinner,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

function CommentForm({ drugId, isSubmitting, onSubmit }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    onSubmit({ drugId, comment });
  }

  return (
    <Box>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button isDisabled={isSubmitting} onClick={handleSubmit}>
        쓰기
      </Button>
    </Box>
  );
}

function CommentList({ drugCommentList }) {
  return (
    <Card>
      <CardHeader>
        <Heading>
          <Heading size="md">댓글 리스트</Heading>
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {drugCommentList.map((drugComment) => (
            <Box key={drugComment.id}>
              <Flex justifyContent="space-between">
                <Heading size="xs">{drugComment.memberId}</Heading>
                <Text fontSize="xs">{drugComment.inserted}</Text>
              </Flex>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function DrugComment({ drugId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [drugCommentList, setDrugCommentList] = useState([]);

  useEffect(() => {
    if (!isSubmitting) {
      const params = new URLSearchParams();
      params.set("id", drugId);

      axios
        .get("/api/drug/comment/list?" + params)
        .then((response) => setDrugCommentList(response.data));
    }
  }, [isSubmitting]);

  function handleSubmit(comment) {
    setIsSubmitting(true);

    axios
      .post("/api/drug/comment/add", comment)
      .finally(() => setIsSubmitting(false));
  }

  // if (drugCommentList === null) {
  //   return <Spinner />;
  // }

  return (
    <Box>
      <CommentForm
        drugId={drugId}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
      <CommentList drugId={drugId} drugCommentList={drugCommentList} />
    </Box>
  );
}
