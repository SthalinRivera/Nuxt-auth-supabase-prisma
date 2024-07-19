import { Video } from "~/interfaces/video"

export default defineEventHandler((event) => {
    const videos: Video[] = [
        {
            "id": 1,
            "description": "Example 1",
            "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
            "data_potagem": "2024-05-25"
        },
        {
            "id": 2,
            "description": "Example 2",
            "url": "https://www.youtube.com/embed/yhFU1fvbsWI?si=Acf99JAtXjaI9LRF",
            "data_potagem": "2024-05-26"
        },
        {
            "id": 3,
            "description": "Example 3",
            "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
            "data_potagem": "2024-05-27"
        },
        {
            "id": 4,
            "description": "Example 4",
            "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
            "data_potagem": "2024-05-28"
        },
        {
            "id": 5,
            "description": "Example 5",
            "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
            "data_potagem": "2024-05-29"
        },
        {
            "id": 6,
            "description": "Example 6",
            "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
            "data_potagem": "2024-05-30"
        },
        {
            "id": 7,
            "description": "Example 7",
            "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
            "data_potagem": "2024-05-31"
        },
        {
            "id": 8,
            "description": "Example 8",
            "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
            "data_potagem": "2024-06-01"
        },
        {
            "id": 9,
            "description": "Example 9",
            "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
            "data_potagem": "2024-06-02"
        },
        {
            "id": 10,
            "description": "Example 10",
            "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
            "data_potagem": "2024-06-03"
        }

    ]

    const requestId = event.context.params?.id || 0;
    return {
        videos: videos.find((v) => v.id === + requestId),
    }
})