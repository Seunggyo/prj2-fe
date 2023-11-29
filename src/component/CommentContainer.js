import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Textarea,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function CommentForm({ boardId, isSubmitting, onSubmit }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    onSubmit({ boardId, comment });
  }

  return (
    <div>
      <Box>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={handleSubmit} isDisabled={isSubmitting}>
          쓰기
        </Button>
      </Box>
    </div>
  );
}

function CommentList({ boardId }) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("id", boardId);

    axios
      .get("/api/comment/list?" + params)
      .then((r) => setCommentList(r.data));
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <Heading size="md">댓글 리스트</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {commentList.map((comment) => (
              <Box>
                <Flex justifyContent="space-between">
                  <Heading size="xs">{comment.memberNickName}</Heading>
                  <Text fontSize="xs">{comment.inserted}</Text>
                </Flex>
                <Text sx={{ whiteSpace: "pre-wrap" }} pt="2" fontSize="sm">
                  {comment.comment}
                </Text>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}

export function CommentContainer({ boardId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(comment) {
    setIsSubmitting(true);

    axios
      .post("/api/comment/add", comment)
      .finally(() => setIsSubmitting(false));
  }

  return (
    <div>
      <Box>
        <CommentForm
          boardId={boardId}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
        <CommentList boardId={boardId} />
      </Box>
    </div>
  );
}
