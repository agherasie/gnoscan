import React from 'react';
import axios from 'axios';
import Text from '@/components/ui/text';
import {eachMedia} from '@/common/hooks/use-media';
import {useQuery, UseQueryResult} from 'react-query';
import {formatEllipsis} from '@/common/utils';
import ActiveList from '@/components/ui/active-list';
import {v1} from 'uuid';
import {colWidth, List, listTitle, StyledCard, StyledText} from '../main-active-list';
import IconLink from '@/assets/svgs/icon-link.svg';
import {API_URI} from '@/common/values/constant-value';
import {getLocalDateString} from '@/common/utils/date-util';
import {Button} from '@/components/ui/button';
import IconInfo from '@/assets/svgs/icon-info.svg';
import Tooltip from '@/components/ui/tooltip';
import FetchedSkeleton from '../fetched-skeleton';

type BoardsValueType = {
  no: number;
  originName: string;
  formatName: string;
  hovertext: string;
  replies: number;
  reposts: number;
  uniqueUsers: number;
};

interface BoardsResultType {
  last_update: string;
  data: BoardsValueType[];
}

const ActiveBoards = () => {
  const media = eachMedia();
  const {
    data: boards,
    isSuccess: boardsSuccess,
    isFetched: boardsFetched,
  }: UseQueryResult<BoardsResultType> = useQuery(
    ['info/most_active_board'],
    async () => await axios.get(API_URI + '/latest/info/most_active_board'),
    {
      select: (res: any) => {
        const boards = res.data.boards.map((v: any, i: number) => {
          return {
            no: v.idx,
            originName: v.board_name,
            formatName: formatEllipsis(v.board_name),
            hovertext: v.board_name,
            replies: v.replies,
            reposts: v.reposts,
            uniqueUsers: v.unique_users,
          };
        });
        return {
          last_update: getLocalDateString(res.data.last_update),
          data: boards,
        };
      },
      // onSuccess: res => console.log('Boards Data : ', res),
    },
  );

  return (
    <StyledCard>
      <Text className="active-list-title" type="h6" color="primary">
        Monthly Active Boards
        {media !== 'mobile' && boardsFetched && (
          <Text type="body1" color="tertiary">
            {`Last Updated: ${boards?.last_update}`}
          </Text>
        )}
      </Text>
      {boardsFetched ? (
        <ActiveList title={listTitle.boards} colWidth={colWidth.boards}>
          {boards?.data.map((v: BoardsValueType) => (
            <List key={v1()}>
              <StyledText type="p4" width={colWidth.boards[0]} color="tertiary">
                {v.no}
              </StyledText>
              <StyledText type="p4" width={colWidth.boards[1]} color="blue" className="with-link">
                <a
                  href={`https://test3.gno.land/r/demo/boards:${v.originName}`}
                  target="_blank"
                  rel="noreferrer">
                  <Tooltip content={v.hovertext}>
                    <>
                      {v.formatName}
                      <IconLink className="icon-link" />
                    </>
                  </Tooltip>
                </a>
              </StyledText>
              <StyledText type="p4" width={colWidth.boards[2]} color="reverse">
                {v.replies}
              </StyledText>
              <StyledText type="p4" width={colWidth.boards[3]} color="reverse">
                {v.reposts}
              </StyledText>
              <StyledText type="p4" width={colWidth.boards[4]} color="reverse">
                {v.uniqueUsers}
              </StyledText>
            </List>
          ))}
        </ActiveList>
      ) : (
        <FetchedSkeleton />
      )}

      {media === 'mobile' && boardsFetched && (
        <Text type="body1" color="tertiary" margin="16px 0px 0px" textAlign="right">
          {`Last Updated: ${boards?.last_update}`}
        </Text>
      )}
    </StyledCard>
  );
};

export default ActiveBoards;
