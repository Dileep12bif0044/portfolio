import styled  from "styled-components";

export const NavBarWrapper = styled.div`
    margin: auto;
    display: flex;
    flex-direction: row;
    max-width: 80%;
    color: #cff5da;
    margin-bottom: 20px;
    justify-content: center;
    background-color: rgb(154, 163, 173);
    border-radius: 0px 0px 5px 5px;

    ul {
        display: flex;
    flex-direction: row;
        list-style-type:none;
    }

    li {
        margin: 25px;
        cursor: pointer;
    }

    li:hover {
        color: #132e1b;
    }

    .active {
        color: #c9afaf;
        font-size: 20px;
        font-weight: 900;
        margin:22px;
    }

    .inactive {
        color: #132e1b;
        margin:25px;
    }
`