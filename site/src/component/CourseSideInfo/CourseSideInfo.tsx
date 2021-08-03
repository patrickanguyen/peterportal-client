import React, { FC } from 'react';
import { min, max } from 'lodash';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { CourseData } from '../../types/types';

interface CourseSideInfoProps extends CourseData {
}

interface GetInstructorData {
    course: {
        instructor_history: Array<{
            ucinetid: string,
            name: string
        }>
    }
}

const CourseSideInfo: FC<CourseSideInfoProps> = (props) => {
    const PROFESSOR_QUERY = gql`
        query GetInstructor {
            course(id: "${props.id}"){
                instructor_history{
                    ucinetid
                    name
                }
            }
        }
    `;

    const { loading, error, data } = useQuery<GetInstructorData>(PROFESSOR_QUERY);

    if (loading) return <>'Loading...'</>;
    else if (error) return <>`Error! ${error.message}`</>;

    return <div>
        <div style={{ display: 'flex', backgroundColor: '#EEEEEE', padding: '1rem' }}>
            <div>
                💻
            </div>
            <div style={{ marginLeft: '1.5rem' }}>
                <h2 style={{ marginBottom: '0.2rem' }}>{props.id}</h2>
                <h5 style={{ margin: 0 }}>{props.title}</h5>
            </div>
        </div>

        <div style={{ padding: '1.5rem' }}>
            <p>{props.school}&nbsp;･&nbsp;
                {min(props.units) === max(props.units) ?
                    <span>{props.units[0]} units</span> :
                    <span>{min(props.units)} - {max(props.units)} units</span>}
            </p>

            <h5>Course Description</h5>
            <p>{props.description}</p>

            {props.ge_list.length != 0 && <div>
                <h5>GE Criteria</h5>
                {props.ge_list.map((e) =>
                    <div key={`ge-${e}`}>
                        <span>
                            {e}
                        </span>
                    </div>
                )}<br />
            </div>
            }

            {props.professor_history.length != 0 && <div>
                <h5>Instructor History</h5>
                {data!.course.instructor_history.map((prof) =>
                    <div key={`instr-hist-${prof.ucinetid}`}>
                        <span>
                            <Link to={{ pathname: `/professor/${prof.ucinetid}` }}>
                                {prof.name}
                            </Link>
                        </span>
                    </div>
                )}
                <br />
            </div>
            }
        </div>
    </div>
}

export default CourseSideInfo;