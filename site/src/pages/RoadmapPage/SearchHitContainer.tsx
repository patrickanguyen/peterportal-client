import React, { FC } from 'react'
import CourseHitItem from './CourseHitItem'
import { Pagination, Hits, InitialLoader, SelectedFilters, InitialViewDisplayProps } from 'searchkit'

import { ElasticSearchIndex } from '../../types/types'

// Array of highlighted fields. Any highlight matches will be render
// as <highlight> html element
const highlightFieldValues = {
    'courses': [
        'name',
        'department',
        'number',
        'description',
    ],
    'professors': [
        'name',
        'title',
        'department',
        'course_history'
    ]
}

// Custom rendering of InitialLoader component
const InitialLoaderComponent = (props: InitialViewDisplayProps) => <div style={{ fontSize: '12pt' }}>Fetching course data...</div>;

interface SearchHitContainerProps {
    query: ElasticSearchIndex;
}

const SearchHitContainer: FC<SearchHitContainerProps> = (props) => {
    return (
        <article>
            <div style={{ minHeight: '80vh' }}>
                <Hits
                    itemComponent={CourseHitItem}
                    hitsPerPage={20}
                    highlightFields={highlightFieldValues[props.query]}
                    customHighlight={{
                        pre_tags: ['<highlight>'],
                        post_tags: ['</highlight>'],
                    }}
                />
            </div>
            <InitialLoader component={InitialLoaderComponent} />
            <Pagination showNumbers={true} />
        </article>
    )
}

export default SearchHitContainer;