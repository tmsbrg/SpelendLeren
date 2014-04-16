/* UnitConfig: contains the stats of the units, and what buildings produce
   which units */
// TODO: Make getting unit config less fugly
Main.UnitConfig =
{
    farmer:
    [
        {
            attack: 11,
            defense: 9,
            speed: 12,
        },
    ],
    knight:
    [
        {
            attack: 16,
            defense: 14,
            speed: 6,
        },
    ],
    monk:
    [
        {
            attack: 2,
            defense: 4,
            speed: 8,
        },
    ],

    unitForBuilding:
    {
        farm: "farmer",
        homestead: "knight",
        church: "monk"
    },

    buildingSizes:
    {
        farm: 64,
        homestead: 128,
        church: 64
    },
}
